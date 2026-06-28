import html from "../blog/.html";

// De-html-ifying text
function deHTML(t) {
    if (!t) {
        return '';
    }
    t = t.replaceAll("&", "&gt;")
    t = t.replaceAll("<", "&lt;")
    return t
}

export async function renderBlog(data, tmz) {
    const response = new Response(html)

    return new HTMLRewriter()
        .on('.blog-content', {
            element(el) {
                el.setInnerContent(
                    deHTML(
                        data.content
                    ).replaceAll('\n', '<br>'),

                    { html: true }
                )
            }
        })
        .on('.blog-date', {
            element(el) {
                el.append( (new Date(data.created_at).toLocaleDateString([], { 
                    month: '2-digit', 
                    day: '2-digit', 
                    year: '2-digit', 
                    timeZone: tmz 
                }) ).replaceAll('/', '.'), { contentOptions: 'after' })
            }
        })
        .on('.blog-date-time', {
            element(el) {
                var temp = new Date(data.created_at).toLocaleTimeString([], { timeZone: tmz }).split(' ')
                var temp2 = temp[0].split(':')
                el.append(temp2[0] + ':' + temp2[1] + ' ' + temp[1].toLowerCase(), { contentOptions: 'after' })
            }
        })
        .transform(response).text()
}