import Link from "next/link"


export default function Footer() {
  return (
    <footer>
      <hr />
      <ul className="navbar_list">
        <li className="navbar__link">
          <a href="https://next-auth.js.org">Documentation</a>
        </li>
        <li className="navbar__link">
          <a href="https://www.npmjs.com/package/next-auth">NPM</a>
        </li>
        <li className="navbar__link">
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li className="navbar__link">
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>

      </ul>
    </footer>
  )
}