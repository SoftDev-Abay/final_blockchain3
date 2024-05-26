const User = require('../models/User-model');
const AuthService = require('../services/auth-service');

class UserController {
	async register(req, res) {
		try {
			const {
				name,
				email,
				password,
				bio,
				profilePicture,
				walletAddress,
			} = req.body;

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res
					.status(400)
					.json({ message: 'Email already exists' });
			}

			const newUser = await AuthService.register({
				name,
				email,
				password,
				bio,
				profilePicture,
				walletAddress,
			});
			res.status(201).json({
				message: 'User created successfully!',
				user: newUser,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const { user, accessToken, refreshToken } = await AuthService.login(
				email,
				password
			);

			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				secure: true,
			});
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
			});

			res.json({
				message: 'Login successful!',
				user,
				accessToken: accessToken,
			});
		} catch (err) {
			console.error(err);
			res.status(401).json({ message: 'Invalid email or password' });
		}
	}

	async refreshToken(req, res) {
		try {
			const cookies = req.cookies;

			console.log(cookies);

			if (!cookies?.refreshToken)
				return res
					.status(401)
					.json({ message: 'Refresh Token is required' });

			const refreshToken = cookies.refreshToken;

			const tokens = await AuthService.refresh(refreshToken);
			res.json({
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Failed to refresh token' });
		}
	}

	async getUserData(req, res) {
		const visitorId = req.user.userId;
		const profileId = req.params.id;

		try {
			const profileUser = await User.findById(profileId);
			if (!profileUser) {
				return res.status(404).json({ message: 'User not found' });
			}

			if (visitorId !== profileId) {
				profileUser.profileVisits.push({ visitorId: visitorId });
				await profileUser.save();
			}

			const { password, refreshToken, ...userData } =
				profileUser.toObject();

			res.json(userData);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async getMyProfile(req, res) {
		try {
			const user = await User.findById(req.user.userId).populate(
				'friends'
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			const { password, ...profileData } = user.toObject();
			res.json(profileData);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async getMyFriends(req, res) {
		try {
			const userId = req.user.userId;
			const user = await User.findById(userId).populate(
				'friends',
				'name email bio profilePicture'
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user.friends);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async searchUsers(req, res) {
		try {
			console.log(req.query);

			let { query } = req.query;

			if (!query) {
				query = '';
			}

			const regex = new RegExp(query, 'i');
			const users = await User.find({ name: { $regex: regex } }).select(
				'-password -refreshToken'
			);

			if (users.length === 0) {
				return res.status(404).json({ message: 'No users found' });
			}

			res.json(users);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}

	async logVisit(req, res) {
		const { userId } = req.user;
		const { id } = req.params;

		try {
			const profileUser = await User.findById(id);
			if (!profileUser) {
				return res.status(404).json({ message: 'Profile not found' });
			}

			profileUser.profileVisits.push({ visitorId: userId });
			await profileUser.save();

			res.status(200).json({ message: 'Visit logged' });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Failed to log visit' });
		}
	}

	async getVisitors(req, res) {
		const { userId } = req.user;

		try {
			const user = await User.findById(userId).populate(
				'profileVisits.visitorId',
				'name email'
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.json({ visitors: user.profileVisits });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Failed to retrieve visitors' });
		}
	}
}

module.exports = new UserController();
