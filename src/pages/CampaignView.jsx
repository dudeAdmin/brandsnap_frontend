import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ImageModal from '../components/ImageModal';
import Footer from '../components/Footer';
import PromptSelector from '../components/PromptSelector';
import Loader from '../components/Loader';

const CampaignView = () => {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [assets, setAssets] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [viewingImage, setViewingImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deletingAssetId, setDeletingAssetId] = useState(null);
    const [deletingCampaign, setDeletingCampaign] = useState(false);

    useEffect(() => {
        fetchCampaignData();
    }, [campaignId]);

    const fetchCampaignData = async () => {
        try {
            setLoading(true);
            const campRes = await api.get(`/api/campaigns/${campaignId}`);
            setCampaign(campRes.data);
            const assetsRes = await api.get(`/api/assets?campaignId=${campaignId}`);
            setAssets(assetsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
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
            setDeletingAssetId(assetId);
            try {
                await api.delete(`/api/assets/${assetId}`);
                fetchCampaignData();
            } catch (error) {
                console.error("Error deleting asset", error);
            } finally {
                setDeletingAssetId(null);
            }
        }
    };

    const handleDeleteCampaign = async () => {
        if (window.confirm('Are you sure you want to delete this campaign? This will also delete all associated assets.')) {
            setDeletingCampaign(true);
            try {
                await api.delete(`/api/campaigns/${campaignId}`);
                window.location.href = `/project/${campaign.project.id}`;
            } catch (error) {
                console.error("Error deleting campaign", error);
                alert('Failed to delete campaign. Please try again.');
            } finally {
                setDeletingCampaign(false);
            }
        }
    };

    const handleSelectPrompt = (promptTemplate) => {
        setPrompt(promptTemplate);
    };

    const handleClearPrompt = () => {
        setPrompt('');
    };

    if (loading || !campaign) return <Loader text="Loading campaign..." />;

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <Link to={`/project/${campaign.project.id}`} className="text-brand-blue hover:underline">
                        &larr; Back to Project
                    </Link>
                    <button
                        onClick={handleDeleteCampaign}
                        disabled={deletingCampaign}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                            deletingCampaign ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                    >
                        {deletingCampaign ? (
                            <>
                                <Loader size="small" inline={true} />
                                <span>Deleting...</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Delete Campaign
                            </>
                        )}
                    </button>
                </div>
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

                    {/* Prompt Selector Component */}
                    <PromptSelector onSelectPrompt={handleSelectPrompt} />

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

                    {/* Prompt Textarea with Clear Button */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Your Prompt
                            </label>
                            {prompt && (
                                <button
                                    onClick={handleClearPrompt}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Clear Prompt
                                </button>
                            )}
                        </div>
                        <textarea
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                            rows="4"
                            placeholder="Describe the image you want to generate..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={generating || !prompt}
                        className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors flex items-center gap-2 ${generating ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-600'}`}
                    >
                        {generating ? (
                            <>
                                <Loader size="small" inline={true} />
                                <span>Generating...</span>
                            </>
                        ) : (
                            'Generate Asset'
                        )}
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
                                    <button 
                                        onClick={() => handleDelete(asset.id)} 
                                        disabled={deletingAssetId === asset.id}
                                        className={`text-sm font-medium flex items-center gap-1 ${
                                            deletingAssetId === asset.id ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'
                                        }`}
                                    >
                                        {deletingAssetId === asset.id ? (
                                            <>
                                                <Loader size="small" inline={true} />
                                                <span>Deleting...</span>
                                            </>
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
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
