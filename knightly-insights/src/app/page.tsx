import Image from 'next/image'
import styles from './page.module.css'
import Logout from './components/logout'
import { cookies } from 'next/headers'
import db from '@/db'
import { use } from 'react'
import Chessground from '@react-chess/chessground'

const getUser = async () => {
  const cookieStore = cookies();

  const result = await db.getUser(cookieStore);

  return result as any;
}

export default function Home() {
  const user = use(getUser())
  const isAdmin = !user?.username
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      {isAdmin
        ? <p>Welcome, admin</p>
        : <p>Welcome {user.username}</p>
      }
      <Logout />
    </main>
  )
}
