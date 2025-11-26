import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ImageModal from '../components/ImageModal';
import Footer from '../components/Footer';

const CampaignView = () => {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [assets, setAssets] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [viewingImage, setViewingImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        fetchCampaignData();
    }, [campaignId]);

    const fetchCampaignData = async () => {
        try {
            const campRes = await api.get(`/api/campaigns/${campaignId}`);
            setCampaign(campRes.data);
            const assetsRes = await api.get(`/api/assets?campaignId=${campaignId}`);
            setAssets(assetsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            await api.post(`/api/assets`, {
                campaignId,
                prompt,
                inputImage: uploadedImage || (selectedAsset ? selectedAsset.imageData : null)
            });
            setPrompt('');
            setSelectedAsset(null);
            setUploadedImage(null);
            fetchCampaignData();
        } catch (error) {
            console.error("Error generating asset", error);
        } finally {
            setGenerating(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result); // This is the base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (asset) => {
        setSelectedAsset(asset);
        setPrompt(asset.prompt);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (assetId) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await api.delete(`/api/assets/${assetId}`);
                fetchCampaignData();
            } catch (error) {
                console.error("Error deleting asset", error);
            }
        }
    };

    if (!campaign) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <Link to={`/project/${campaign.project.id}`} className="text-brand-blue hover:underline mb-4 block">&larr; Back to Project</Link>
                <h1 className="text-3xl font-bold mb-2 text-brand-navy">{campaign.purpose}</h1>

                <div className="mb-8 bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">{selectedAsset ? 'Edit Asset' : 'Generate New Asset'}</h2>
                    {selectedAsset && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Editing based on:</p>
                            <img src={selectedAsset.imageData} alt="Context" className="h-20 w-20 object-cover rounded border" />
                            <button onClick={() => setSelectedAsset(null)} className="text-xs text-red-500 ml-2">Clear context</button>
                        </div>
                    )}

                    {/* Image Upload Section */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Reference Image (Optional)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                            />
                            {uploadedImage && (
                                <button
                                    onClick={() => setUploadedImage(null)}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        {uploadedImage && (
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                <img
                                    src={uploadedImage}
                                    alt="Upload preview"
                                    className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                                />
                            </div>
                        )}
                    </div>

                    <textarea
                        className="w-full border p-2 rounded mb-4"
                        rows="3"
                        placeholder="Describe the image you want to generate..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleGenerate}
                        disabled={generating || !prompt}
                        className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${generating ? 'bg-gray-400' : 'bg-brand-blue hover:bg-blue-600'}`}
                    >
                        {generating ? 'Generating...' : 'Generate Asset'}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {assets.map(asset => (
                        <div key={asset.id} className="bg-white rounded shadow overflow-hidden group">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <img
                                    src={asset.imageData}
                                    alt={asset.prompt}
                                    className="w-full h-full object-center object-cover group-hover:opacity-75 cursor-pointer"
                                    onClick={() => setViewingImage(asset)}
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-500 truncate mb-4">{asset.prompt}</p>
                                <div className="flex justify-between">
                                    <button onClick={() => handleEdit(asset)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                    <button onClick={() => handleDelete(asset.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Modal */}
                {viewingImage && (
                    <ImageModal
                        imageData={viewingImage.imageData}
                        prompt={viewingImage.prompt}
                        onClose={() => setViewingImage(null)}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default CampaignView;
