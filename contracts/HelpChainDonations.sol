// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title HelpChainDonations
 * @dev Smart contract for transparent, blockchain-based charitable donations
 * @notice This contract allows campaign creation, donations (both monetary and in-kind),
 * donation tracking, and fund withdrawal
 */
contract HelpChainDonations {
    uint public campaignCount;
    uint public donationCount;
    address public owner;

    enum DonationStatus { Recibida, EnCamino, Entregada }

    struct Campaign {
        uint id;
        address creator;
        string title;
        string description;
        uint goal;
        uint raised;
        bool active;
        address wallet;
    }

    struct Donation {
        uint id;
        uint campaignId;
        address donor;
        uint amount;
        string tipo; // "Dinero" o "Viveres"
        string metadataCID; // optional IPFS CID for in-kind donations
        uint timestamp;
        DonationStatus status;
    }

    mapping(uint => Campaign) public campaigns;
    mapping(uint => Donation) public donations;
    mapping(uint => uint[]) public donationsByCampaign;

    event CampaignCreated(uint indexed campaignId, address indexed creator, address walletReceiver, uint goal);
    event DonationMade(uint indexed donationId, uint indexed campaignId, address indexed donor, uint amount, string tipo, string metadataCID);
    event DonationStatusUpdated(uint indexed donationId, uint indexed campaignId, DonationStatus newStatus);
    event Withdrawal(uint indexed campaignId, address indexed to, uint amount);

    modifier onlyCampaignCreator(uint campaignId) {
        require(campaigns[campaignId].creator == msg.sender, "Not campaign creator");
        _;
    }

    modifier onlyOwnerOrCreator(uint campaignId) {
        require(
            campaigns[campaignId].creator == msg.sender || owner == msg.sender,
            "Not authorized"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Creates a new campaign
     * @param title Campaign title
     * @param description Campaign description
     * @param goal Funding goal in wei
     * @param walletReceiver Address that will receive the funds
     * @return campaignId The ID of the newly created campaign
     */
    function createCampaign(
        string calldata title,
        string calldata description,
        uint goal,
        address walletReceiver
    ) external returns (uint) {
        require(goal > 0, "Goal must be > 0");
        require(walletReceiver != address(0), "Invalid wallet address");
        
        campaignCount++;
        campaigns[campaignCount] = Campaign({
            id: campaignCount,
            creator: msg.sender,
            title: title,
            description: description,
            goal: goal,
            raised: 0,
            active: true,
            wallet: walletReceiver
        });
        
        emit CampaignCreated(campaignCount, msg.sender, walletReceiver, goal);
        return campaignCount;
    }

    /**
     * @dev Make a donation to a campaign
     * @param campaignId The campaign to donate to
     * @param tipo Type of donation: "Dinero" or "Viveres"
     * @param metadataCID IPFS CID for in-kind donation metadata (optional)
     * @return donationId The ID of the donation
     */
    function donate(
        uint campaignId,
        string calldata tipo,
        string calldata metadataCID
    ) external payable returns (uint) {
        require(campaigns[campaignId].active, "Campaign not active");
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        
        donationCount++;
        donations[donationCount] = Donation({
            id: donationCount,
            campaignId: campaignId,
            donor: msg.sender,
            amount: msg.value,
            tipo: tipo,
            metadataCID: metadataCID,
            timestamp: block.timestamp,
            status: DonationStatus.Recibida
        });
        
        donationsByCampaign[campaignId].push(donationCount);

        if (msg.value > 0) {
            campaigns[campaignId].raised += msg.value;
        }

        emit DonationMade(donationCount, campaignId, msg.sender, msg.value, tipo, metadataCID);
        return donationCount;
    }

    /**
     * @dev Update donation status (only by campaign creator or contract owner)
     * @param donationId The donation to update
     * @param newStatus The new status
     */
    function updateDonationStatus(uint donationId, DonationStatus newStatus) external {
        require(donationId > 0 && donationId <= donationCount, "Invalid donation ID");
        uint campaignId = donations[donationId].campaignId;
        require(
            campaigns[campaignId].creator == msg.sender || owner == msg.sender,
            "Not authorized"
        );
        
        donations[donationId].status = newStatus;
        emit DonationStatusUpdated(donationId, campaignId, newStatus);
    }

    /**
     * @dev Withdraw raised funds (only by campaign creator)
     * @param campaignId The campaign to withdraw from
     */
    function withdraw(uint campaignId) external onlyCampaignCreator(campaignId) {
        uint amount = campaigns[campaignId].raised;
        require(amount > 0, "No funds to withdraw");
        
        address payable to = payable(campaigns[campaignId].wallet);
        campaigns[campaignId].raised = 0;
        
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Transfer failed");
        
        emit Withdrawal(campaignId, to, amount);
    }

    /**
     * @dev Get all donations for a campaign
     * @param campaignId The campaign ID
     * @return Array of donations
     */
    function getDonationsForCampaign(uint campaignId) external view returns (Donation[] memory) {
        uint[] storage ids = donationsByCampaign[campaignId];
        Donation[] memory list = new Donation[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            list[i] = donations[ids[i]];
        }
        return list;
    }

    /**
     * @dev Get campaign details
     * @param campaignId The campaign ID
     * @return Campaign struct
     */
    function getCampaign(uint campaignId) external view returns (Campaign memory) {
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        return campaigns[campaignId];
    }

    /**
     * @dev Get donation details
     * @param donationId The donation ID
     * @return Donation struct
     */
    function getDonation(uint donationId) external view returns (Donation memory) {
        require(donationId > 0 && donationId <= donationCount, "Invalid donation ID");
        return donations[donationId];
    }

    /**
     * @dev Deactivate a campaign (only by creator)
     * @param campaignId The campaign to deactivate
     */
    function deactivateCampaign(uint campaignId) external onlyCampaignCreator(campaignId) {
        campaigns[campaignId].active = false;
    }
}
