import { PostsCollection } from "../../imports/api/posts/collection"

// fill the DB with example data on startup
export const createUserDump = (count) =>{ 
    for(let i = 0; i < count; i++){ 
        const username = `user_${Math.random().toString(36).substring(2,11)}`
      Accounts.createUser({
        username: username,
        password: '1234',
        profile:{
          name: username
        }
      })
    }
  }

  export const createDumpPost = async (count) =>{ 
    for(let i = 0; i < count; i++){ 
        const _ = `post_${Math.random().toString(36).substring(2,11)}`
        const document = { 
            title: `title ${_}`,
            description: `description + ${_}`,
            content: `content ${_}`,
            createdBy: 'TTFi8EtvX3ZtYew5k', //🤔
            createdAt: new Date()
        }
        PostsCollection.insertAsync(document)
    }
  }
  
  