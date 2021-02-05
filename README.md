# hotelManagementSystem
酒店管理系统

# hotel-client 
- login 登录界面
  1. css3 skew 倾斜属性
    绘制页面倾斜拼接
  2. 验证码验证  注意：在登录与注册切换时，要刷新验证码图片，采用的方式是父组件调用子组件的方法
    - 使用 canvas 绘制验证码
    - 使用 watch 来监听验证码的绘制的结果
    - 准备工作：生成一个随机整数 => 生成一个随机颜色( rgb 颜色)
    - 绘制图片
      1. 拿到画布 getContext
      2. 绘制背景 ctx.fillStyle 随机色
      3. 填充位置 ctx.fillRect
      4. 绘制内容
        - 随机生成长度为4的字符串 
          1. 随机生成单个字符
          2. 随机字体大小
          3. 字体随机旋转角度
          4. 字体样式
          5. 填充位置
          6. 利用 ctx.save() 保存当前状态
          7. 将文字旋转处理好后，绘制到画布上 ctx.fillText 
          8. 利用 ctx.restore() 还原之前保存的状态
        - 随机生成5条干扰线条
          1. ctx.beginPath 起始一条路径
          2. ctx.moveTo 把路径移动到画布中的指定点，不创建线条
          3. ctx.lineTo 添加一个新点，然后在画布中创建从该点到最后指定点的线条
          4. ctx.strokeStyle 绘制已定义的路径
          5. ctx.closePath() 创建从当前点回到起始点的路径
          6. ctx.stroke() 绘制已定义路径
        - 随机产生40个干扰的小点
          1. ctx.arc() 创建曲线
          2. ctx.fill() 填充当前绘图
  3. 忘记密码
    - 对密码进行修改
    - 修改完毕后转到登录状态进行登录才可进入首页
  4. 记住我
    - 先利用 crypto 插件对密码进行加密操作
    - 再将工号和密码存储到本地存储中
  5. 在页面过载时，若本地存储了记住我的信息，先将密码进行解密操作，再将其自动填入到页面信息中




# hotel-server
  - 使用 koa 技术 + MongoDB 数据库
  - 使用 koa2-cors 解决跨域问题
  - 利用 koa-bodyparser 帮助 koa 做参数解析