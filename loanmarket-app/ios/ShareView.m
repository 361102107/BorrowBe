//
//  ShareView.m
//  rn
//
//  Created by 周原 on 2019/4/12.
//  Copyright © 2019年 Facebook. All rights reserved.
//
#define SCREEN_HEIGHT UIScreen.mainScreen.bounds.size.height
#define SCREEN_WIDTH UIScreen.mainScreen.bounds.size.width
#import "ShareView.h"
@interface ShareView()
@property(nonatomic,nullable)UIView * blackView;
@property(nonatomic,nullable)UIView * showView;

@end

@implementation ShareView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if(self){
      [self createUI];
    }
    return self;
}



- (void)createUI{
  
  _blackView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)];
  _blackView.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.7];
  [self addSubview:_blackView];
  
  UITapGestureRecognizer * tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(processTap:)];
  [_blackView addGestureRecognizer:tap];
  
  _showView = [[UIView alloc] initWithFrame:CGRectMake(0, SCREEN_HEIGHT -170, SCREEN_WIDTH, 170)];
  _showView.backgroundColor = [UIColor whiteColor];
  [self addSubview:_showView];
  
  UIView * line = [[UIView alloc] initWithFrame:CGRectMake(20, 35, SCREEN_WIDTH - 40, 1)];
  line.backgroundColor = [UIColor colorWithRed:240/255.0 green:240/255.0 blue:240/255.0 alpha:1];
  [_showView addSubview:line];
  
  UILabel * title = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 80, 20)];
  title.textAlignment = NSTextAlignmentCenter;
  title.center = CGPointMake(SCREEN_WIDTH/2, line.center.y);
  title.text = @"分享到";
  [_showView addSubview:title];
  
  UIScrollView * scrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 45, SCREEN_WIDTH, 110)];
  scrollView.showsHorizontalScrollIndicator = NO;
  [_showView addSubview:scrollView];
  
  NSArray * images = @[@"share_01",@"share_02",@"share_03",@"share_04",@"share_05",@"share_06"];
  NSArray * titles = @[@"微信好友",@"朋友圈",@"QQ好友",@"QQ空间",@"复制链接",@"系统分享"];
  for(int i = 0; i < images.count; i ++){
    UIButton * button = [UIButton buttonWithType:UIButtonTypeCustom];
    button.frame = CGRectMake(10 + (70 + 10) * i, 10, 70, 70);
    [button setImage:[UIImage imageNamed:images[i]] forState:UIControlStateNormal];
    [button addTarget:self action:@selector(processClickBtn:) forControlEvents:UIControlEventTouchUpInside];
    button.tag = 100 + i;
    [scrollView addSubview:button];
    
    UILabel * titleLb = [[UILabel alloc] initWithFrame:CGRectMake(0, CGRectGetMaxY(button.frame), 70, 20)];
    titleLb.center = CGPointMake(button.center.x, titleLb.center.y);
    titleLb.textAlignment = NSTextAlignmentCenter;
    titleLb.text = titles[i];
    titleLb.font = [UIFont systemFontOfSize:13];
    [scrollView addSubview:titleLb];
    
    [scrollView setContentSize:CGSizeMake(CGRectGetMaxX(button.frame) + 10, 0)];
  }
  
}

- (void)processClickBtn:(UIButton *)sender{
  
  if(self.shareSelectedBlock){
    self.shareSelectedBlock(sender.tag - 100);
  }
  [self removeFromSuperview];
}

- (void)processTap:(UIGestureRecognizer *)sender{
  [self removeFromSuperview];
  
}

- (void)show{
  
  [[[UIApplication sharedApplication] keyWindow] addSubview:self];
}

@end
