package com.rn;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rn.share.ShareDialogFragment;

public class IntentModule extends ReactContextBaseJavaModule {
    public IntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IntentModule";
    }

    /**
     * 从JS页面跳转到原生activity   同时也可以从JS传递相关数据到原生
     *
     * @param name   需要打开的Activity的class
     * @param params
     */
    @ReactMethod
    public void startActivityFromJS(String name, String params) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                ShareDialogFragment shareDialogFragment = new ShareDialogFragment();
                Bundle bundle = new Bundle();
                bundle.putString("url", params);
                shareDialogFragment.setArguments(bundle);
                shareDialogFragment.show(currentActivity.getFragmentManager(), "dialogFragment");
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }
}