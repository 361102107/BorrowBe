package com.rn.share

import android.annotation.SuppressLint
import android.app.DialogFragment
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.view.*
import android.widget.*
import com.cnpc.logistics.bean.share.ShareInfo
import com.rn.R
import com.tencent.connect.share.QQShare
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject
import com.tencent.tauth.IUiListener
import com.tencent.tauth.Tencent
import com.tencent.tauth.UiError
import java.net.URL
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context.CLIPBOARD_SERVICE
import com.tencent.connect.share.QzoneShare
import com.tencent.connect.share.QzoneShare.SHARE_TO_QZONE_TYPE_IMAGE_TEXT
import java.util.ArrayList


/**
 * 分享QQ/微信dialog
 * @author: https://github.com/honglei92
 * @time: 2018/9/7
 */
class ShareDialogFragment : DialogFragment() {
    private var shareType = QQShare.SHARE_TO_QQ_TYPE_DEFAULT
    lateinit var wxShare: WXShare
    private val THUMB_SIZE = 150
    private var url = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //设置style
        setStyle(DialogFragment.STYLE_NORMAL, R.style.BottomDialog)
        isCancelable = true
        url = arguments.getString("url")

        wxShare = WXShare(activity)
        wxShare.setListener(object : WXShare.OnResponseListener {
            override fun onCancel() {
//                T.show("onCancel: ")
            }

            override fun onFail(message: String?) {
//                T.show("onFail:$message")
            }

            override fun onSuccess() {
//                T.show("onSuccess")
            }
        })
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        val view = inflater.inflate(R.layout.share_dialog, null)
        //底部展示业务代码
        val window = dialog.window
        val lp = window.attributes
        lp.gravity = Gravity.BOTTOM //底部
        lp.width = WindowManager.LayoutParams.MATCH_PARENT
        window.attributes = lp


        //布局控件展示与相应
        view.findViewById<LinearLayout>(R.id.llQQ).setOnClickListener {
            share(1)
        }
        view.findViewById<LinearLayout>(R.id.llQQZone).setOnClickListener {
            share(2)
        }
        view.findViewById<LinearLayout>(R.id.llSystem).setOnClickListener {
            share(3)
        }
        view.findViewById<LinearLayout>(R.id.llUrl).setOnClickListener {
            share(4)
        }

        return view
    }

    override fun onStart() {
        super.onStart()
        wxShare.register()
    }

    override fun onDestroy() {
        wxShare.unregister()
        super.onDestroy()
    }

    /**
     * 分享代码
     */
    @SuppressLint("CheckResult")
    private fun share(i: Int) {
        /* val shareIntent = Intent(Intent.ACTION_SEND)
         shareIntent.type = "text/plain"
         shareIntent.setPackage("com.tencent.mm")
         shareIntent.setClassName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareImgUI") //微信朋友
         shareIntent.setClassName("com.tencent.mobileqq", "com.tencent.mobileqq.activity.JumpActivity") //QQ好友或QQ群
         shareIntent.putExtra(Intent.EXTRA_TEXT, "https://timesnew.cn")
         activity.startActivity(Intent.createChooser(shareIntent, "分享"))*/
        val shareInfo = ShareInfo()
        shareInfo.title = "134"
        shareInfo.imageUrl = "https://cdn2.jianshu.io/assets/web/qingteng-ba39362882b7534a42ac1eaf292409b6.png"
        shareInfo.shortUrl = url
        when (i) {
            1 -> {
                onClickShare(shareInfo)
            }
            2 -> {
                qZoneShare(shareInfo)
            }
            3 -> {
                val shareIntent = Intent(Intent.ACTION_SEND)
                shareIntent.type = "text/plain"
//                shareIntent.setPackage("com.tencent.mm")
//                shareIntent.setClassName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareImgUI") //微信朋友
//                shareIntent.setClassName("com.tencent.mobileqq", "com.tencent.mobileqq.activity.JumpActivity") //QQ好友或QQ群
                shareIntent.putExtra(Intent.EXTRA_TEXT, shareInfo.shortUrl)
                activity.startActivity(Intent.createChooser(shareIntent, "分享"))
            }
            4 -> {
                val myClipboard: ClipboardManager = activity.getSystemService(CLIPBOARD_SERVICE) as ClipboardManager
                val myClip: ClipData
                val text = shareInfo.shortUrl
                myClip = ClipData.newPlainText("text", text)
                myClipboard.primaryClip = myClip
                Toast.makeText(activity, "链接已复制到剪贴板", Toast.LENGTH_SHORT).show()
            }
        }

    }

    private var qqShareListener: IUiListener = object : IUiListener {
        override fun onCancel() {
            if (shareType != QQShare.SHARE_TO_QQ_TYPE_DEFAULT) {
//                T.show("onCancel: ")
            }
        }

        override fun onComplete(response: Any) {
//            T.show("onComplete: " + response.toString())
        }

        override fun onError(e: UiError) {
//            T.show("onError: " + e.errorMessage)
        }
    }

    /**
     * QQ分享
     */
    private fun onClickShare(shareInfo: ShareInfo?) {
        val params = Bundle()
        params.putInt(QQShare.SHARE_TO_QQ_KEY_TYPE, shareType)
        params.putString(QQShare.SHARE_TO_QQ_TITLE, shareInfo!!.title)
        params.putString(QQShare.SHARE_TO_QQ_SUMMARY, "")
        params.putString(QQShare.SHARE_TO_QQ_TARGET_URL, shareInfo.shortUrl)
        params.putString(QQShare.SHARE_TO_QQ_IMAGE_URL, shareInfo.imageUrl)
        params.putString(QQShare.SHARE_TO_QQ_APP_NAME, "借去呗(安卓版)")
        val mTencent = Tencent.createInstance("1108711159", activity)
        mTencent.shareToQQ(activity, params, qqShareListener)
    }

    /**
     * QQ空间分享
     */
    private fun qZoneShare(shareInfo: ShareInfo?) {
        //分享类型
        val params = Bundle()
        var arrayList = ArrayList<String>()
        arrayList.add(shareInfo!!.imageUrl!!)
        params.putInt(QzoneShare.SHARE_TO_QZONE_KEY_TYPE, QzoneShare.SHARE_TO_QZONE_TYPE_IMAGE_TEXT)
        params.putString(QzoneShare.SHARE_TO_QQ_TITLE, shareInfo!!.title)//必填
        params.putString(QzoneShare.SHARE_TO_QQ_SUMMARY, "摘要")//选填
        params.putString(QzoneShare.SHARE_TO_QQ_TARGET_URL, shareInfo.shortUrl)//必填
        params.putStringArrayList(QzoneShare.SHARE_TO_QQ_IMAGE_URL, arrayList)
        val mTencent = Tencent.createInstance("1108711159", activity)
        mTencent.shareToQzone(activity, params, qqShareListener)
    }

    /**
     * 微信分享链接
     */
    private fun shareWebPage(shareInfo: ShareInfo?) {
        val webpage = WXWebpageObject()
        webpage.webpageUrl = shareInfo!!.shortUrl
        val msg = WXMediaMessage(webpage)
        msg.title = shareInfo.title
        msg.description = ""
        Thread(Runnable {
            val bmp = BitmapFactory.decodeStream(URL(shareInfo.imageUrl).openStream())
//        val bmp = BitmapFactory.decodeResource(activity.resources, R.drawable.ic_logo)
            if (bmp == null) {
                Toast.makeText(activity, "图片不能为空", Toast.LENGTH_SHORT).show()
            } else {
                val thumbBmp = Bitmap.createScaledBitmap(bmp, THUMB_SIZE, THUMB_SIZE, true)
                bmp.recycle()
                msg.thumbData = Util.bmpToByteArray(thumbBmp, true)
            }

            val req = SendMessageToWX.Req()
            req.transaction = buildTransaction("webpage")
            req.message = msg
            req.scene = SendMessageToWX.Req.WXSceneSession
            wxShare.api.sendReq(req)
        }).start()

    }

    private fun buildTransaction(type: String): String {
        return type + System.currentTimeMillis()
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        dialog.window.requestFeature(Window.FEATURE_NO_TITLE)
        super.onActivityCreated(savedInstanceState)
        dialog.window.setBackgroundDrawable(ColorDrawable(0x00000000))
        dialog.window.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT)
    }
}