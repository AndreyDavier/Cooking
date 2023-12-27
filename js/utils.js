function tag(params) {
    let tag = document.createElement(params.tag);
    tag.className = params.className;
    params.parent.append(tag);

    if (params.html) {
        tag.innerHTML = params.html;
    }
    if (params.href) {
        tag.href = params.href;
    }


    return tag
}