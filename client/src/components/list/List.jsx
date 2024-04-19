import './list.scss'
import Card from"../card/Card"

function List({posts}){

  return (
    <div className='list'>
      {posts.map(post=>(
        <Card key={post.id} item={post}/>
      ))}
    </div>
  )
}

export default List