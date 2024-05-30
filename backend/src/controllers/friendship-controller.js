const solanaFriendship = require('../api/solanaFriendship');

class FriendshipController {
	async sendFriendRequest(req, res) {
		console.log(req.body);
		const { initiator, receiver } = req.body;
		try {
			await sendFriendRequest(initiator, receiver);
			res.status(200).json({
				message: 'Friend request sent successfully via Solana!',
			});
		} catch (error) {
			console.error('Failed to send friend request:', error);
			res.status(500).json({
				message: 'Failed to send friend request via Solana',
				error: error.toString(),
			});
		}
	}

	async acceptFriendRequest(req, res) {
		const { request, receiver } = req.body;
		try {
			await solanaFriendship.acceptFriendRequest(request, receiver);
			res.status(200).json({
				message: 'Friend request accepted successfully via Solana!',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Failed to accept friend request via Solana',
			});
		}
	}

	async getFriendRequests(req, res) {
		try {
			const friendRequests = await solanaFriendship.getFriendRequests();
			res.status(200).json({ friendRequests });
		} catch (error) {
			console.error('Error fetching friend requests from Solana:', error);
			res.status(500).json({
				message: 'Failed to fetch friend requests from Solana',
			});
		}
	}
}

module.exports = new FriendshipController();
