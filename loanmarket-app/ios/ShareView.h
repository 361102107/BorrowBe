//
//  ShareView.h
//  rn
//
//  Created by 周原 on 2019/4/12.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
typedef void(^ShareSelectedBlock)(NSInteger index);
@interface ShareView : UIView
@property(nonatomic,copy)ShareSelectedBlock shareSelectedBlock;
- (void)show;
@end

NS_ASSUME_NONNULL_END
