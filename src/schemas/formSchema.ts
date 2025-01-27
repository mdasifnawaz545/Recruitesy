import exp from 'constants'
import * as z from 'zod'

const SocialLinks = z.object({
    resume: z.string().min(6, "Enter a valid link"),
    github: z.string().min(6, "Enter a valid link"),
    linkedin: z.string().min(6, "Enter a valid link")
})
const formSchema = z.object({
    name: z.string().min(3, "Enter a valid name"),
    domain: z.string(),
    kiitemail: z.string().email("Enter a valid email"),
    email: z.string().email("Enter a valid email"),
    roll: z.string().min(4, "Enter a valid roll"),
    gender: z.string(),
    contactNumber: z.string().min(10, "Enter a valid number").max(10, "Enter a valid number"),
    yearOfStudy: z.string(),
    branch: z.string(),
    links: SocialLinks,
    existSocieties: z.string().min(3, "Enter a valid society"),
    whyElabs: z.string().min(3, "Enter a valid society"),
    fromWhereYouGotKnow: z.string().min(1, "Enter a valid society"),
    anythingElse: z.string().min(1, "Enter a valid society"),
    present: z.boolean().default(false),
    interviewed: z.boolean().default(false),
    interviewedBy: z.string(),
    isinterviewRunning: z.boolean().default(false),
    selected: z.boolean().default(false),
    selectedBy: z.string(),
    message: z.string()

}

)

export default formSchema;