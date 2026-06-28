import html from "../comment/.html";

export async function renderComment(data, tmz) {
    const response = new Response(html)

    return new HTMLRewriter()
        .on('.message', {
            element(el) {
                el.setInnerContent(data.message)
            }
        })
        .on('.metadata a', {
            element(el) {
                el.setAttribute("href", data.website)
                el.setInnerContent(data.author)
            }
        })
        .on('.metadata', {
            element(el) {
                el.append(' | ' + new Date(data.created_at).toLocaleString([], { timeZone: tmz }), { contentOptions: 'after' })
            }
        })
        .transform(response).text()
}