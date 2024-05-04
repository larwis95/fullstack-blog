module.exports = {
    format_post: (post) => {
        const shortPost = post.substring(0, 100);
        return shortPost + '...';
    },
    format_date: (date) => {
        return date.toLocaleDateString();
    },
}