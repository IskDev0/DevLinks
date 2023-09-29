const linkImage = (link: { platform: string }): string | undefined => {

    if (link.platform === 'GitHub') {
        return 'github.svg'
    } else if (link.platform === 'Youtube') {
        return 'youtube.svg'
    } else if (link.platform === 'LinkedIn') {
        return 'linkedin.svg'
    } else if (link.platform === 'Twitter') {
        return 'twitter.svg'
    }
    else if (link.platform === 'GitLab') {
        return 'gitlab.svg'
    }
}

export default linkImage