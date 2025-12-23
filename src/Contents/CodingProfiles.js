import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from "react-icons/si";

export const codingProfiles = [
    {
        id: "leetcode",
        name: "LeetCode",
        url: "https://leetcode.com/u/THARUNKUMARMANIKANDAN/",
        icon: SiLeetcode,
        color: "#FFA116",
        apiType: "leetcode",
        handle: "THARUNKUMARMANIKANDAN",
        fallbackStats: [
            { label: "Total Solved", value: "300+" },
            { label: "Easy", value: "100+" },
            { label: "Medium", value: "150+" },
            { label: "Hard", value: "50+" },
            { label: "Global Rank", value: "Top 20%" },
            { label: "Contests", value: "10+" }
        ]
    },
    {
        id: "codeforces",
        name: "Codeforces",
        url: "https://codeforces.com/profile/THARUNKUMAR_M",
        icon: SiCodeforces,
        color: "#1f8acb",
        apiType: "codeforces",
        handle: "THARUNKUMAR_M",
        fallbackStats: [
            { label: "Rating", value: "1200+" },
            { label: "Max Rating", value: "1250" },
            { label: "Rank", value: "Pupil" },
            { label: "Contests", value: "25+" },
            { label: "Problems", value: "500+" },
            { label: "Contribution", value: "Positive" }
        ]
    },
    {
        id: "codechef",
        name: "CodeChef",
        url: "https://www.codechef.com/users/tharun_kumar_m",
        icon: SiCodechef,
        color: "#5b4638",
        apiType: "manual",
        handle: "tharun_kumar_m",
        fallbackStats: [
            { label: "Current Rating", value: "1600+" },
            { label: "Star Rating", value: "3 Star" },
            { label: "Global Rank", value: "Top 5k" },
            { label: "Contests", value: "20+" },
            { label: "Problems", value: "200+" },
            { label: "Div Rank", value: "Div 2" }
        ]
    },
    {
        id: "gfg",
        name: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/profile/tharunmanikr2qq",
        icon: SiGeeksforgeeks,
        color: "#2f8d46",
        apiType: "manual",
        handle: "tharunmanikr2qq",
        fallbackStats: [
            { label: "Coding Score", value: "500+" },
            { label: "Problems", value: "100+" },
            { label: "Rank", value: "Top 10" },
            { label: "Easy", value: "50+" },
            { label: "Medium", value: "30+" },
            { label: "Hard", value: "20+" }
        ]
    },
    {
        id: "github",
        name: "GitHub",
        url: "https://github.com/Tharun-Kumar-228",
        icon: FaGithub,
        color: "#ffffff",
        apiType: "github",
        handle: "Tharun-Kumar-228",
        fallbackStats: [
            { label: "Repositories", value: "25+" },
            { label: "Stars Earned", value: "15+" },
            { label: "Commits", value: "500+" },
            { label: "PRs", value: "20+" },
            { label: "Followers", value: "10+" },
            { label: "Contributions", value: "Active" }
        ]
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tharunkumar2005/",
        icon: FaLinkedin,
        color: "#0a66c2",
        apiType: "manual",
        handle: "tharunkumar2005",
        fallbackStats: [
            { label: "Connections", value: "500+" },
            { label: "Followers", value: "1000+" },
            { label: "Posts", value: "50+" },
            { label: "Articles", value: "5+" },
            { label: "Engagement", value: "High" },
            { label: "Profile View", value: "Public" }
        ]
    }
];
