const linkColor = (link: { platform: string }) => {
    if (link.platform === 'GitHub') {
        return "bg-[#171515] text-white"
    } else if (link.platform === 'Youtube') {
        return "bg-[#FF0000] text-white"
    } else if (link.platform === 'LinkedIn') {
        return "bg-[#0076B2] text-white"
    } else if (link.platform === 'Twitter') {
        return "bg-[#1DA1F2] text-white"
    }
    else if (link.platform === "GitLab") {
        return "bg-[#E2432A] text-white"
    }
}

export default linkColor