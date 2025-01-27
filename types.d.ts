interface sessionUser {
    id: string
    username: string,
    email: string
}

interface recruitUser extends Document {
    username: string,
    password: string,
    email: string,

}

interface domainObject {
    domain: string,
    logo: string,
    dbDomainName: string,
}

interface SocialLinks {
    resume: string,
    github: string,
    linkedin: string
}

interface candidate extends Document {
    name: string,
    domain: string,
    kiitemail: string,
    email: string,
    roll: string,
    gender: string,
    contactNumber: string,
    yearOfStudy: string,
    branch: string,
    links: SocialLinks,
    existSocieties: string,
    whyElabs: string,
    fromWhereYouGotKnow: string,
    anythingElse: string,

    // Backend Stuff

    present: boolean,
    interviewed: boolean,
    interviewedBy: string,
    isinterviewRunning: boolean,
    selected: boolean,
    selectedBy: string,
    message: string
}

interface APIResponse {
    message: string,
    status: boolean
}