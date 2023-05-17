import { SideBar } from "./components/SideBar"
import { Header } from "./components/Header"
import { Post } from "./components/Post"

import styles from './app.module.css'
import './global.css'

const posts = [{
  id: 1,
  author: {
    avatarUrl: 'https://github.com/diego3g.png',
    name: 'Diego Fernandez',
    role: 'CTO @RocketSeat'
  },
  content: [
    { type: 'paragraph', content: 'Fala galeraa 👋', },
    { type: 'paragraph', content: 'A paixão por criar interfaces incríveis e funcionais é o que me motiva todos os dias como desenvolvedor 🚀' },
    { type: 'link', content: 'nlwsetup' }
  ],
  publishedAt: new Date('2023-05-15 20:00:00'),
},
{
  id: 2,
  author: {
    avatarUrl: 'https://github.com/maykbrito.png',
    name: 'Mayk Brito',
    role: 'Educator @RocketSeat'
  },
  content: [
    { type: 'paragraph', content: 'Fala galeraa 👋', },
    { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
    { type: 'link', content: 'jane.design/doctorcare' }
  ],
  publishedAt: new Date('2023-05-19 20:00:00'),
}]

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <SideBar />
        <main>
          {
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt} />
              )
            })
          }
        </main>
      </div>

    </div >

  )
}

export default App


