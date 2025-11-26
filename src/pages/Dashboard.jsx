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
                        <Link to={`/project/${project.id}`} key={project.id} className="block">
                            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600">{project.description}</p>
                                <p className="text-sm text-gray-400 mt-4">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
