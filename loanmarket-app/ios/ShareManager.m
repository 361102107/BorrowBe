//
//  ShareManager.m
//  rn
//
//  Created by 周原 on 2019/4/10.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "ShareManager.h"
#import <UMShare/UMShare.h>
#import "ShareView.h"
@interface ShareManager()
@property(nonatomic,nullable)ShareView * shareView;
@end
@implementation ShareManager
+ (ShareManager *)shareInstance{
  static ShareManager * s_instance_dj_singleton = nil ;
  if (s_instance_dj_singleton == nil) {
    s_instance_dj_singleton = [[ShareManager alloc] init];
  }
  return (ShareManager *)s_instance_dj_singleton;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(Show:(NSString *)title des:(NSString *)des iconUrl:(NSString*)iconUrl shareUrl:(NSString *)shareUrl){
  NSLog(@"hellozhouyuan");
  
  dispatch_async(dispatch_get_main_queue(), ^{
    self.shareView = [[ShareView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    [self.shareView show];
    __weak typeof(self) weakSelf = self;
    self.shareView.shareSelectedBlock = ^(NSInteger index) {
      
      if(index == 0){//微信
        [weakSelf shareWebPageToPlatformType:UMSocialPlatformType_WechatSession title:title des:des iconUrl:iconUrl shareUrl:shareUrl];
      }else if(index == 1){//朋友圈
        [weakSelf shareWebPageToPlatformType:UMSocialPlatformType_WechatTimeLine title:title des:des iconUrl:iconUrl shareUrl:shareUrl];
      }else if(index == 2){//qq
        [weakSelf shareWebPageToPlatformType:UMSocialPlatformType_QQ title:title des:des iconUrl:iconUrl shareUrl:shareUrl];
      }else if(index == 3){//qq空间
        [weakSelf shareWebPageToPlatformType:UMSocialPlatformType_Qzone title:title des:des iconUrl:iconUrl shareUrl:shareUrl];
      }else if(index == 4){//复制
        UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
        pasteboard.string = shareUrl;
      }else if(index == 5){//系统分享
        
        [weakSelf systemTitle:title iconUrl:iconUrl shareUrl:shareUrl];
      }
    };
  });
  
  

  
}
//- (ShareView *)shareView{
//  if(!_shareView){
//    _shareView = [[ShareView alloc] initWithFrame:[UIScreen mainScreen].bounds];
//
//  }
//  return _shareView;
//}


- (void)systemTitle:(NSString *)title iconUrl:(NSString*)iconUrl shareUrl:(NSString *)shareUrl{
  NSString *shareText = title;
  UIImage *shareImage = [UIImage imageNamed:@"167x167.png"];
  NSURL *shareURL = [NSURL URLWithString:shareUrl];
  NSArray *activityItems = [[NSArray alloc] initWithObjects:shareText, shareImage, shareURL, nil];
  
  UIActivityViewController *vc = [[UIActivityViewController alloc] initWithActivityItems:activityItems applicationActivities:nil];
  
  UIActivityViewControllerCompletionWithItemsHandler myBlock = ^(UIActivityType activityType, BOOL completed, NSArray *returnedItems, NSError *activityError) {
    NSLog(@"%@",activityType);
    if (completed) {
      NSLog(@"分享成功");
    } else {
      NSLog(@"分享失败");
    }
    [vc dismissViewControllerAnimated:YES completion:nil];
  };
  
  vc.completionWithItemsHandler = myBlock;
  UIViewController * view = [[[UIApplication sharedApplication] keyWindow] rootViewController];
  [view presentViewController:vc animated:YES completion:nil];
}

- (void)shareWebPageToPlatformType:(UMSocialPlatformType)platformType title:(NSString *)title des:(NSString *)des iconUrl:(NSString*)iconUrl shareUrl:(NSString *)shareUrl
{
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  //创建网页内容对象
  NSString* thumbURL =  iconUrl;
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:des thumImage:thumbURL];
  //设置网页地址
  shareObject.webpageUrl = shareUrl;
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  //调用分享接口
  UIViewController * view = [[[UIApplication sharedApplication] keyWindow] rootViewController];
  [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:view completion:^(id data, NSError *error) {
    if (error) {
      UMSocialLogInfo(@"************Share fail with error %@*********",error);
    }else{
      if ([data isKindOfClass:[UMSocialShareResponse class]]) {
        UMSocialShareResponse *resp = data;
        //分享结果消息
        UMSocialLogInfo(@"response message is %@",resp.message);
        //第三方原始返回的数据
        UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
      }else{
        UMSocialLogInfo(@"response data is %@",data);
      }
    }
  }];
}

@end
