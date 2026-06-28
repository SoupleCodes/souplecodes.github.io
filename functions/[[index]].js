import { renderComment } from '../templates/comment/.js'
import { renderBlog } from '../templates/blog/.js'

export async function httpFetch(env, route, method, body, responseType) {
    let link
    if (env && env.DEV_MODE) {
        link = 'http://localhost:8787'
    } else {
        link = 'https://db.souple.workers.dev'
    }

    try {
        var json = {}
        json.method = method || "GET"
        json.headers = {}
        if (!(method=="GET") && !(method=="HEAD")) {
            if (responseType=='formdata') {
                json.body = body
            } else {
                json.body = JSON.stringify(body) || {}
            }
        }
        var response = await fetch(link + route, json)
        if (responseType == 'text') {
            return await response.text()
        } else {
            return await response.json()
        }
    } catch (error) {
        console.error(error)
    }
}

export async function onRequest(context) {
    const { request, env } = context
    const assetUrl = new URL('/home.html', request.url);
    let response = await env.ASSETS.fetch(assetUrl);
    const path = context.functionPath
    const rewriter = new HTMLRewriter()
    const timezone = request.cf.timezone

    String.prototype.startsWith = function( str ){
        return ( this.indexOf( str ) === 0 );
    };

    if (path) {
        switch(true) {
            case path.startsWith('/api/post/create'):
                let data = await request.formData()
                let result = await httpFetch(env, '/comment', 'POST', {
                    content: data.get('blog-content')
                }, 'json')

                return new Response('', {headers: {'Content-Type': 'text/html'}})
                break;
            case path.startsWith('/api/blog/create'):
                let blogData = await request.formData()
                let blogCreateResult = await httpFetch(env, '/blog', 'POST', {
                    content: blogData.get('blog-content'),
                }, 'json')

                return new Response('Successfully created blog', {headers: {'Content-Type': 'text/html'}})
                break;
            default:
                let comments = await httpFetch(env, '/comments', 'GET', null, 'json')
                let blogs = await httpFetch(env, '/blogs', 'GET', null, 'json')

                rewriter
                    .on('#guestbook-comments', {
                        async element(el) {
                            for (let i = 0; i < comments.length; i++) {
                                var c = comments[i]
                                el.append(await renderComment(c, timezone), { html: true, contentOptions: 'after' })
                            }

                        }
                    })
                    .on('#blogs', {
                        async element(el) {
                            for (let i = 0; i < blogs.length; i++) {
                                var b = blogs[i]
                                el.prepend(await renderBlog(b, timezone), { html: true, contentOptions: 'after' })
                            }

                        }
                    })
                    .on('#tabs-content .tab-blog', {
                        element(el) {
                            if (( env && env.DEV_MODE )) {
                                el.append(`<br><form action="/api/blog/create" method="post" autocomplete="off" onsubmit="window.location.href='/'"> 
                                                <label for="blog-content">Submit:</label><br>
                                                <textarea id="blog-content" name="blog-content" rows="6" cols="40" required=""></textarea><br>

                                                <button type="submit">Submit</button>
                                            </form>`
                                , { html: true, contentOptions: 'after' })
                            }
                        }
                    })
                break;
        }
    }

    return rewriter.transform(response)
}