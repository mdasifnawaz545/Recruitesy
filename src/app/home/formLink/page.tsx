"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import formSchema from "@/schemas/formSchema";
import React from "react";
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from '@/hooks/use-toast'
import { Router } from "lucide-react";
import { redirect } from "next/navigation"

// import formSchemaDefaultValue from "@/constants/formData";   

const page = ({ }) => {

    // If you do not make this component  as client component then it will give you a error as userForm is not a function.

    // I also figured out  that if we explicitely create the data type or the already created Candidate type can also be used with it because we only have to give the schema or type of the data which is coming or which i am getting.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            domain: "Select Domain",
            kiitemail: "",
            email: "",
            roll: "",
            gender: "Select Gender",
            contactNumber: "",
            yearOfStudy: "Select Year",
            branch: "Select Branch",
            links: {
                resume: "",
                github: "",
                linkedin: ""
            },
            existSocieties: "",
            whyElabs: "",
            fromWhereYouGotKnow: "",
            anythingElse: "",
            present: false,
            interviewed: false,
            interviewedBy: "",
            isinterviewRunning: false,
            selected: false,
            selectedBy: "",
            message: ""
        },
    });

    const { toast } = useToast();

    const handleFormSubmission = async (data: z.infer<typeof formSchema>) => {
        // console.log(data);
        const response = await axios.post("/api/addCandidate", data);
        if (response) {
            toast({
                title: "Form is Submitted",
                description: "Your form is Submitted Successfully"
            });
            redirect("/home/completed");
        }
        else {
            toast({
                title: "Form is not Submitted",
                description: "Your form is not Submitted try again !",
                variant: "destructive"
            })
        }
    }


    return (
        <div className="w-full text-black min-h-screen flex items-center justify-center py-4">
            <div className=" w-full md:w-1/2 px-8 md:px-0 mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmission)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roll"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Roll</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Roll Number" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kiitemail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter KIIT Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="KIIT Email" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Personal Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Personal Email" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Select Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Contact Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Number" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="domain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Select Domain</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Domain" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="webdevelopment">WEB</SelectItem>
                                            <SelectItem value="java">JAVA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="yearOfStudy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Select Your Current Year</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1st">1st</SelectItem>
                                            <SelectItem value="2nd">2nd</SelectItem>
                                            <SelectItem value="3rd">3rd</SelectItem>

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="branch"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Select Your Branch</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="cse">CSE</SelectItem>
                                            <SelectItem value="csse">CSSE</SelectItem>
                                            <SelectItem value="ecse">ECSE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="links.resume"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Your Resume <b>Link</b> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Resume Link" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="links.github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Your Github <b>Link</b> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Github Link" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="links.linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Enter Your Linkedin <b>Link</b> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Linkedin Link" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="existSocieties"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Existing Society</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Existing Society" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whyElabs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Why Elabs</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Some Good Points of Elabs" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fromWhereYouGotKnow"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">From Where you got to Know</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Referal" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="anythingElse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Anything Else</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Something about yourself rather than present in resume" className="text-black" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-transparent border-[1px] border-gray-600 w-full hover:shadow-md hover:shadow-blue-400 h-8 text-slate-50 hover:duration-200">Submit</Button>
                    </form>
                </Form>



            </div>

        </div>
    )
}

export default page;


