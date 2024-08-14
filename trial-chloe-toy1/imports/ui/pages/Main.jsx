import React, {useState, useEffect} from 'react'
import Grid from '@mui/joy/Grid';
import { PostCard } from '../components';

export default () => { 
    const [posts, setPosts] = useState([])
    useEffect(()=>{ 
        Meteor.callAsync("getPosts").then((res)=>setPosts(res));
    },[])

    // const posts = useTracker("allPosts", () =>
    //     PostsCollection.find({}).fetchAsync()
    // );
    


    return <div>
        {/* TODO: 반응형-모바일에서는 d-none, 메뉴 hamberger든 뭐시기든. ...가 아니고 IA 에 다 나와있음 ^^ */}
        <div className='flex'>
            <div>
                USER LIST
            </div>

            <div>
                CLICKED USER INFO
            </div>

            <div>
                CHAT
            </div>
        </div>


        {/* POSTS */}
        <Grid container columns={5}>
            {posts && posts.map(p=> 
                <PostCard
                      key={p._id}
                      title={p.title}
                      description={p.description}
                      imageUrl={p.imageUrl}
                />
            )}
        </Grid>
    </div>
}