import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get(`/api/projects?userId=${user.id}`);
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    const createProject = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/api/projects?userId=${user.id}`, {
                title: newProjectTitle,
                description: newProjectDesc
            });
            setNewProjectTitle('');
            setNewProjectDesc('');
            fetchProjects();
        } catch (error) {
            console.error("Error creating project", error);
        }
    };

    const handleDeleteProject = async (projectId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project? This will also delete all associated campaigns and assets.')) {
            try {
                await api.delete(`/api/projects/${projectId}`);
                fetchProjects();
            } catch (error) {
                console.error("Error deleting project", error);
                alert('Failed to delete project. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-navy">My Projects</h1>
                </div>

                <div className="mb-8 bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                    <form onSubmit={createProject} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Project Title"
                            className="border p-2 rounded flex-grow"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border p-2 rounded flex-grow"
                            value={newProjectDesc}
                            onChange={(e) => setNewProjectDesc(e.target.value)}
                        />
                        <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-colors">Create</button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="relative">
                            <Link to={`/project/${project.id}`} className="block">
                                <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600">{project.description}</p>
                                    <p className="text-sm text-gray-400 mt-4">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => handleDeleteProject(project.id, e)}
                                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                                title="Delete Project"
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

export default Dashboard;
