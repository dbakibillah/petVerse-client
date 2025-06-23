import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HiUserCircle } from 'react-icons/hi';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singleuser?email=${user.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  const [formData, setFormData] = useState(null);
  const mutation = useMutation({
    mutationFn: async (updatedUser) => {
      const form = new FormData();
      for (const key in updatedUser) {
        form.append(key, updatedUser[key]);
      }
      const res = await axiosPublic.put(`/updateuser?email=${user.email}`, form);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser', user.email]);
      setFormData(null);
    },
  });

  const handleEditClick = () => setFormData(currentUser);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading || !currentUser)
    return <div className="text-center py-20">Loading Profile...</div>;

  // Profile completion bar calculation
  const profileFields = [
    'name', 'phone', 'address', 'organization', 'designation', 'portfolio', 'bio'
  ];

  const filledFieldsCount = profileFields.reduce((count, field) =>
    currentUser[field]?.toString().trim() ? count + 1 : count, 0
  );
  const completionPercent = Math.round((filledFieldsCount / profileFields.length) * 100);

  // Role-based styling
  const roleColors = {
    admin: 'bg-red-100 text-red-700',
    moderator: 'bg-yellow-100 text-yellow-700',
    user: 'bg-green-100 text-green-700',
  };
  const roleClass = roleColors[currentUser.role?.toLowerCase()] || roleColors.user;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-orange-600">User Profile Overview</h2>
          <p className="text-gray-600">Manage your personal and professional details</p>
        </div>
        {!formData && (
          <button
            onClick={handleEditClick}
            className="bg-orange-500 text-white px-5 py-2 rounded-md shadow hover:bg-orange-600 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Completion Bar */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-1">
          Profile Completion: {completionPercent}%
        </label>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-orange-500 transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 border border-orange-200">
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`col-span-1 flex flex-col items-center rounded-lg p-6 ${roleClass}`}>
            {currentUser.photo ? (
              <img
                src={currentUser.photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-300 shadow-md"
              />
            ) : (
              <HiUserCircle className="w-32 h-32 text-orange-400" />
            )}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{currentUser.name}</h3>
            <p className="text-gray-600 italic">{currentUser.role || 'User'}</p>
          </div>

          <div className="col-span-2 space-y-6">
            {formData ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    disabled
                    className="border border-gray-300 p-3 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization || ''}
                    onChange={handleInputChange}
                    placeholder="Organization"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation || ''}
                    onChange={handleInputChange}
                    placeholder="Designation"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio || ''}
                    onChange={handleInputChange}
                    placeholder="Portfolio Website"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                  <input
                    type="text"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    placeholder="Short Bio"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white/80"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 bg-white/80 p-4 rounded-lg">
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Phone:</strong> {currentUser.phone || 'Not set'}</p>
                <p><strong>Address:</strong> {currentUser.address || 'Not set'}</p>
                <p><strong>Organization:</strong> {currentUser.organization || 'Not set'}</p>
                <p><strong>Designation:</strong> {currentUser.designation || 'Not set'}</p>
                <p>
                  <strong>Portfolio:</strong>{' '}
                  {currentUser.portfolio ? (
                    <a
                      href={currentUser.portfolio}
                      className="text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {currentUser.portfolio}
                    </a>
                  ) : (
                    'Not set'
                  )}
                </p>
                <p><strong>Bio:</strong> {currentUser.bio || 'Not set'}</p>
                <p><strong>Role:</strong> {currentUser.role || 'User'}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Active
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
