export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex items-center justify-between h-12 w-full px-5">
      <div className="text-center">
        <p className="text-xs">
          &copy; {currentYear} Young Generation Academy. All rights reserved.
        </p>
      </div>

      <img src="https://avatars.githubusercontent.com/u/221351242?s=200&v=4" alt="Avatar" className="w-8 h-8 rounded-full"/>
    </footer>
  )
}
