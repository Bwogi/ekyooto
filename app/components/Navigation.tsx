import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              TogetherUG Boston
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/events" className="hover:bg-purple-700 px-3 py-2 rounded-md">
                Events
              </Link>
              <Link href="/community" className="hover:bg-purple-700 px-3 py-2 rounded-md">
                Community
              </Link>
              <Link href="/resources" className="hover:bg-purple-700 px-3 py-2 rounded-md">
                Resources
              </Link>
              <Link href="/marketplace" className="hover:bg-purple-700 px-3 py-2 rounded-md">
                Marketplace
              </Link>
              <Link href="/cultural-education" className="hover:bg-purple-700 px-3 py-2 rounded-md">
                Cultural Education
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/auth/signin" className="hover:bg-purple-700 px-3 py-2 rounded-md">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
