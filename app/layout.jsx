import "./globals.css";

export const metadata = {
  title: "硅脉 · 半导体行业动态站",
  description: "半导体产业链研究工作台：事件、公司、景气、资本开支与技术节点。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
