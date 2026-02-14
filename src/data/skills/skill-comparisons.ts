import type { SkillComparison } from '../../types';

export const skillComparisons: SkillComparison[] = [
  {
    id: 'login-page',
    title: '登录页面',
    description:
      '对比普通提示词和 /frontend-design skill 生成的登录页面效果差异',
    skillName: 'frontend-design',
    withoutSkill: {
      prompt:
        '帮我生成一个登录页面, 包含用户名、密码输入框和登录按钮, 使用 React + Tailwind CSS',
      code: `function LoginPage() {
  return (
    <div className="min-h-screen flex items-center
      justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md
        w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6
          text-center">Login</h2>
        <input type="text" placeholder="Username"
          className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Password"
          className="w-full p-2 mb-4 border rounded" />
        <button className="w-full bg-blue-500
          text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </div>
    </div>
  );
}`,
      screenshotUrl: '/images/skill-tutorial/case1-login.png',
    },
    withSkill: {
      prompt:
        '/frontend-design 生成一个现代风格的登录页面, 包含用户名、密码输入框和登录按钮, 使用 React + Tailwind CSS, 要求有品牌感和专业的视觉层次',
      code: `function LoginPage() {
  return (
    <div className="min-h-screen flex items-center
      justify-center bg-gradient-to-br
      from-indigo-50 via-white to-cyan-50">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4
            bg-gradient-to-r from-indigo-600
            to-cyan-500 rounded-2xl flex items-center
            justify-center shadow-lg">
            <SparklesIcon className="w-8 h-8
              text-white" />
          </div>
          <h1 className="text-3xl font-bold
            bg-gradient-to-r from-indigo-600
            to-cyan-500 bg-clip-text
            text-transparent">Welcome Back</h1>
          <p className="text-gray-500 mt-2">
            Sign in to continue</p>
        </div>
        {/* Card with glassmorphism */}
        <div className="backdrop-blur-xl bg-white/80
          rounded-3xl shadow-xl border border-white/20
          p-8 space-y-6">
          <FloatingLabelInput label="Email" />
          <FloatingLabelInput label="Password"
            type="password" />
          <button className="w-full py-3.5
            bg-gradient-to-r from-indigo-600
            to-cyan-500 text-white rounded-xl
            font-semibold shadow-lg
            hover:shadow-indigo-500/25
            transition-all duration-300
            hover:-translate-y-0.5">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}`,
      screenshotUrl: '/images/skill-tutorial/case1-skill-login.png',
    },
    highlights: [
      '视觉层次: skill 版本使用渐变背景、品牌 Logo 区域和分层卡片, 普通版本只有简单灰色背景',
      '配色方案: skill 版本采用 indigo-cyan 渐变配色体系, 普通版本仅用单一 blue-500',
      '交互细节: skill 版本包含 hover 上浮动画、阴影过渡, 普通版本只有基础 hover 变色',
      '组件设计: skill 版本使用 glassmorphism 毛玻璃效果和浮动标签输入框, 普通版本是基础 input',
      '代码结构: skill 版本拆分为品牌区域、表单区域等语义化模块, 普通版本是扁平结构',
    ],
  },
  {
    id: 'dashboard',
    title: '数据仪表盘',
    description:
      '对比普通提示词和 /frontend-design skill 生成的数据仪表盘效果差异',
    skillName: 'frontend-design',
    withoutSkill: {
      prompt:
        '帮我生成一个数据仪表盘页面, 包含 4 个统计卡片、一个折线图区域和一个数据表格, 使用 React + Tailwind CSS',
      code: `function Dashboard() {
  return (
    <div className="p-6 bg-gray-100
      min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
        {/* ... more cards */}
      </div>
      <div className="bg-white p-4 rounded shadow
        mb-6 h-64">
        <p>Chart Area</p>
      </div>
      <table className="w-full bg-white rounded
        shadow">
        <thead><tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Status</th>
        </tr></thead>
        <tbody>{/* rows */}</tbody>
      </table>
    </div>
  );
}`,
      screenshotUrl: '/images/skill-tutorial/case2.png',
    },
    withSkill: {
      prompt:
        '/frontend-design 生成一个专业的数据仪表盘页面, 包含 4 个统计卡片、一个折线图区域和一个数据表格, 使用 React + Tailwind CSS, 要求有清晰的信息层级和数据可视化最佳实践',
      code: `function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-8
        py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold
          text-slate-800">Analytics Dashboard</h1>
        <DateRangePicker />
      </header>
      <main className="p-8 space-y-8">
        {/* KPI Cards with trend indicators */}
        <div className="grid grid-cols-4 gap-6">
          <KPICard title="Total Revenue"
            value="$45,231" change="+20.1%"
            trend="up" icon={DollarIcon}
            sparkline={revenueData} />
          {/* ... more KPI cards */}
        </div>
        {/* Chart with proper axes & legend */}
        <div className="bg-white rounded-2xl p-6
          shadow-sm border border-slate-200">
          <div className="flex justify-between mb-6">
            <h2 className="font-semibold">
              Revenue Overview</h2>
            <SegmentedControl
              options={['7D','1M','3M','1Y']} />
          </div>
          <LineChart data={chartData}
            height={320} />
        </div>
        {/* Data table with sorting & search */}
        <DataTable columns={columns}
          data={tableData}
          searchable sortable paginated />
      </main>
    </div>
  );
}`,
      screenshotUrl: '/images/skill-tutorial/case2-skill.png',
    },
    highlights: [
      '信息层级: skill 版本有顶部导航、KPI 区域、图表区域、表格区域的清晰分层, 普通版本是平铺结构',
      '数据展示: skill 版本的 KPI 卡片包含趋势指标、迷你图表和变化百分比, 普通版本只有数字',
      '交互功能: skill 版本包含日期选择器、时间范围切换、表格搜索排序分页, 普通版本无交互',
      '组件化: skill 版本拆分为 KPICard、LineChart、DataTable 等可复用组件, 普通版本是内联 HTML',
      '视觉细节: skill 版本使用 rounded-2xl、shadow-sm、border 等精细样式, 普通版本样式粗糙',
    ],
  },
  {
    id: 'pricing-page',
    title: '产品定价页面',
    description:
      '对比普通提示词和 /frontend-design skill 生成的 SaaS 定价页面效果差异',
    skillName: 'frontend-design',
    withoutSkill: {
      prompt:
        '帮我生成一个 SaaS 产品定价页面, 包含 3 个定价方案 (基础/专业/企业), 使用 React + Tailwind CSS',
      code: `function PricingPage() {
  return (
    <div className="py-12 bg-gray-100">
      <h1 className="text-3xl font-bold
        text-center mb-8">Pricing</h1>
      <div className="max-w-5xl mx-auto
        grid grid-cols-3 gap-6 px-4">
        <div className="bg-white p-6 rounded
          shadow">
          <h3 className="text-xl font-bold">Basic</h3>
          <p className="text-3xl font-bold my-4">
            $9/mo</p>
          <ul className="space-y-2 mb-6">
            <li>5 Projects</li>
            <li>10GB Storage</li>
          </ul>
          <button className="w-full bg-blue-500
            text-white py-2 rounded">
            Get Started</button>
        </div>
        {/* Pro and Enterprise cards similar */}
      </div>
    </div>
  );
}`,
      screenshotUrl: '/images/skill-tutorial/case3.png',
    },
    withSkill: {
      prompt:
        '/frontend-design 生成一个高转化率的 SaaS 产品定价页面, 包含 3 个定价方案 (基础/专业/企业), 使用 React + Tailwind CSS, 要求突出推荐方案、有清晰的功能对比和 CTA 按钮设计',
      code: `function PricingPage() {
  return (
    <section className="py-24 bg-gradient-to-b
      from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-indigo-600
            font-semibold text-sm uppercase
            tracking-wider">Pricing</span>
          <h2 className="text-4xl font-bold mt-3
            text-slate-900">
            Choose your plan</h2>
          <p className="text-lg text-slate-500 mt-4
            max-w-2xl mx-auto">
            Start free, scale as you grow</p>
          <BillingToggle />
        </div>
        <div className="grid lg:grid-cols-3
          gap-8 items-start">
          <PricingCard tier="Starter"
            price={9} features={starterFeatures} />
          <PricingCard tier="Professional"
            price={29} features={proFeatures}
            highlighted badge="Most Popular"
            className="ring-2 ring-indigo-600
              scale-105 shadow-xl" />
          <PricingCard tier="Enterprise"
            price={99} features={enterpriseFeatures}
            cta="Contact Sales" />
        </div>
        <FeatureComparisonTable plans={plans} />
      </div>
    </section>
  );
}`,
      screenshotUrl: '/images/skill-tutorial/case3-skill.png',
    },
    highlights: [
      '转化设计: skill 版本突出推荐方案 (scale-105 + ring + badge), 普通版本三个方案视觉权重相同',
      '内容策略: skill 版本有副标题、月/年切换、功能对比表格, 普通版本只有基础列表',
      'CTA 设计: skill 版本区分主次按钮 (Contact Sales vs Get Started), 普通版本按钮样式统一',
      '排版节奏: skill 版本使用 py-24、mb-16 等大间距营造呼吸感, 普通版本间距紧凑',
      '组件抽象: skill 版本抽象出 PricingCard、BillingToggle、FeatureComparisonTable, 普通版本是重复 HTML',
    ],
  },
];
