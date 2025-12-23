import { useState, useEffect } from "react";

export const useProfileStats = (profiles) => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const newStats = {};

            await Promise.all(profiles.map(async (profile) => {
                try {
                    if (profile.apiType === "github") {
                        const userRes = await fetch(`https://api.github.com/users/${profile.handle}`);
                        const userData = await userRes.json();

                        // Fetch repos to count stars
                        const reposRes = await fetch(`https://api.github.com/users/${profile.handle}/repos?per_page=100`);
                        const reposData = await reposRes.json();
                        const totalStars = Array.isArray(reposData)
                            ? reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
                            : 0;

                        newStats[profile.id] = [
                            { label: "Repositories", value: userData.public_repos || "N/A" },
                            { label: "Stars Earned", value: totalStars },
                            { label: "Followers", value: userData.followers || "0" },
                            { label: "Following", value: userData.following || "0" },
                            { label: "Public Gists", value: userData.public_gists || "0" },
                            { label: "Created At", value: new Date(userData.created_at).getFullYear() }
                        ];
                    }
                    else if (profile.apiType === "leetcode") {
                        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${profile.handle}`);
                        const data = await res.json();
                        if (data.status === "success") {
                            newStats[profile.id] = [
                                { label: "Total Solved", value: data.totalSolved },
                                { label: "Easy", value: data.easySolved },
                                { label: "Medium", value: data.mediumSolved },
                                { label: "Hard", value: data.hardSolved },
                                { label: "Global Ranking", value: data.ranking },
                                { label: "Acceptance", value: data.acceptanceRate ? `${data.acceptanceRate}%` : "N/A" }
                            ];
                        } else {
                            throw new Error("LeetCode API Error");
                        }
                    }
                    else if (profile.apiType === "codeforces") {
                        // 1. Fetch User Info
                        const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${profile.handle}`);
                        const userData = await userRes.json();

                        // 2. Fetch Contest History
                        const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${profile.handle}`);
                        const ratingData = await ratingRes.json();

                        if (userData.status === "OK") {
                            const user = userData.result[0];
                            const contestCount = ratingData.status === "OK" ? ratingData.result.length : "N/A";

                            newStats[profile.id] = [
                                { label: "Current Rating", value: user.rating || "Unrated" },
                                { label: "Max Rating", value: user.maxRating || "N/A" },
                                { label: "Rank", value: user.rank ? user.rank.toUpperCase() : "Nx/A" },
                                { label: "Contests", value: contestCount },
                                { label: "Friends", value: user.friendOfCount || "N/A" },
                                { label: "Registered", value: "Verified" }
                            ];
                        }
                    }
                    else {
                        // Fallback / Manual Data
                        newStats[profile.id] = profile.fallbackStats;
                    }
                } catch (error) {
                    console.warn(`Failed to fetch stats for ${profile.name}`, error);
                    newStats[profile.id] = profile.fallbackStats;
                }
            }));

            setStats(newStats);
            setLoading(false);
        };

        fetchStats();
    }, [profiles]);

    return { stats, loading };
};
