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

    const handleDeleteCampaign = async (campaignId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this campaign? This will also delete all associated assets.')) {
            try {
                await api.delete(`/api/campaigns/${campaignId}`);
                fetchProjectData();
            } catch (error) {
                console.error("Error deleting campaign", error);
                alert('Failed to delete campaign. Please try again.');
            }
        }
    };

    const handleDeleteProject = async () => {
        if (window.confirm('Are you sure you want to delete this project? This will also delete all associated campaigns and assets.')) {
            try {
                await api.delete(`/api/projects/${projectId}`);
                window.location.href = '/dashboard';
            } catch (error) {
                console.error("Error deleting project", error);
                alert('Failed to delete project. Please try again.');
            }
        }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/dashboard" className="text-brand-blue hover:underline">
                        &larr; Back to Dashboard
                    </Link>
                    <button
                        onClick={handleDeleteProject}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete Project
                    </button>
                </div>
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
                        <div key={campaign.id} className="relative">
                            <Link to={`/campaign/${campaign.id}`} className="block">
                                <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                                    <h3 className="text-xl font-bold mb-2">{campaign.purpose}</h3>
                                    <p className="text-gray-500">{campaign.assetCount || 0} Assets</p>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => handleDeleteCampaign(campaign.id, e)}
                                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                                title="Delete Campaign"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectView;
