import { Hono } from "hono";
import { trimTrailingSlash } from 'hono/trailing-slash'

const app = new Hono<{ Bindings: Bindings }>;
app
  .use(trimTrailingSlash())

  // Comments
  .get('/comments', async (c) => {
    try {
      const { results } = await c.env.DB.prepare('SELECT * FROM comments').run()
      return c.json(results)
    } catch (err) {
      console.error(err)
    }
  })
	.post("/comment", async (c) => {
    try {
      const { author, website, message } = await c.req.json()

      if (!author || !message) {
        return c.json({
          message: "Missing author or body for new comment",
          error: true,
          status: 400
        })
      }
      
      const new_date = new Date().toISOString()
      const { success } = await c.env.DB.prepare("INSERT INTO comments (author, website, message, created_at) VALUES (?, ?, ?, ?)")
        .bind(author, website, message, new_date)
        .run()
      if (success) {
        return c.json({
          message: "Successfully created comment!",
          data: {
            author, 
            website, 
            message,
            created_at: new_date
          },
          error: false,
          status: 201
        })
      }
    } catch (err) {
      console.error(err)
      return c.json({
          message: "Something went wrong while trying to create this comment",
          error: true,
          status: 500
      })
    }
  })

  // Blog-related shenanigans
  .get('/blogs', async (c) => {
    try {
      const { results } = await c.env.DB.prepare('SELECT * FROM blogs').run()
      return c.json(results)
    } catch (err) {
      console.error(err)
    }
  })
  .post("/blog", async (c) => {
    try {
      const { content } = await c.req.json()

      if (!content) {
        return c.json({
          message: "Missing content",
          error: true,
          status: 400
        })
      }
      if (!( c.env && c.env.DEV_MODE )) {
        return c.json({
          message: "Only I can make a blog lol",
          error: true,
          status: 400
        })
      }
      
      const new_date = new Date().toISOString()
      const { success } = await c.env.DB.prepare("INSERT INTO blogs (content, created_at) VALUES (?, ?)")
        .bind(content, new_date)
        .run()
      if (success) {
        return c.json({
          message: "Successfully created blog!",
          data: {
            content,
            created_at: new_date
          },
          error: false,
          status: 201
        })
      }
    } catch (err) {
      console.error(err)
      return c.json({
          message: "Something went wrong while trying to create this comment",
          error: true,
          status: 500
      })
    }
  })


export default app;