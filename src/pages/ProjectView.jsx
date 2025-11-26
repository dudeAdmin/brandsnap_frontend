import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectView = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [newCampaignPurpose, setNewCampaignPurpose] = useState('');

    useEffect(() => {
        fetchProjectData();
    }, [projectId]);

    const fetchProjectData = async () => {
        try {
            const projRes = await api.get(`/api/projects/${projectId}`);
            setProject(projRes.data);
            const campRes = await api.get(`/api/campaigns?projectId=${projectId}`);
            setCampaigns(campRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const createCampaign = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/api/campaigns?projectId=${projectId}`, {
                purpose: newCampaignPurpose
            });
            setNewCampaignPurpose('');
            fetchProjectData();
        } catch (error) {
            console.error("Error creating campaign", error);
        }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <Link to="/dashboard" className="text-brand-blue hover:underline mb-4 block">&larr; Back to Dashboard</Link>
                <h1 className="text-3xl font-bold mb-2 text-brand-navy">{project.title}</h1>
                <p className="text-gray-600 mb-8">{project.description}</p>

                <div className="mb-8 bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
                    <form onSubmit={createCampaign} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Campaign Purpose (e.g. Holiday Sale)"
                            className="border p-2 rounded flex-grow"
                            value={newCampaignPurpose}
                            onChange={(e) => setNewCampaignPurpose(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-colors">Create</button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campaigns.map(campaign => (
                        <Link to={`/campaign/${campaign.id}`} key={campaign.id} className="block">
                            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                                <h3 className="text-xl font-bold mb-2">{campaign.purpose}</h3>
                                <p className="text-gray-500">{campaign.assets ? campaign.assets.length : 0} Assets</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectView;
