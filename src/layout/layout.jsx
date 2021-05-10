import { ThemeProvider } from "/src/context/themeContext";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <main>{children}</main>
    </ThemeProvider>
  )
}