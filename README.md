# HackX
## A totally **DECENTRALISED** hackathon platform 
- All of data are stored on **IPFS**.
- The platform **doesn't** need any centralised cloud service.
## Functions

### Hackathon exploration
Abundant hackathons are shown on **Explore Hackathon** page. Find the most suitable hackathon for you with filters.
### Hackathon details
Comprehensive hackathon details are shown on the **Hackathon detail** page.
There is everything you want to know about a hackathon, including organizers, prizes, criterias, shedules and demos show.
### Project uploading 
There is a kind workflow for you to upload your project.
### Hackathon creation
For organizers, there is a clear workflow to include all the information of your hackathon including overview, prizes, schedule and judgement invitation.
### Authority management
Smart contract is provided to archieve the authority management, which including managing organizers, managing judgements and blocking users etc.
### Project judging
Judging function is provided by smart contracts to make sure the fairness of judging process.

## Deployment
git clone codes to your local environment.
### Front end
1. enter the `front` folder and install dependencies according to `packege.json`
2. the `Pinata IPFS` is used so **pinata jwt token** is needed which can be applied on pinata's official website. And it's suggested that the jwt token should be stored in your `.env`
### Smart contracts
1. you may want to control the authority of your hackathon platform on your own, so it's neccessary to deploy the smart contracts. The address deploy these smart contracts is the owner and has the highest authority.
2. add your node and private key in `.env`
3. install dependencies
4. `hardhat run ignition deploy /ignition/modules/deployContracts.ts --network`
5. replace the contracts' address in `front\utils` folder
### GraphQL
1. GraphQL's service is used to index the events on chain and create entity so you need to create new subgraph for your new contracts.
2. replace the contract address in foldes `subgraph-demos` and `subgraph-hackthon` and their start block in the `subgraph.yaml` 
3. change the network you deploy your contract in `subgraph.yaml`
4. you can find more information about deploying subgraph on GraphQL's official documents.
## Techstack
### Front end 
React + vite & tailwindcss
### Smart contracts
hardhat v3.0
### Block indexing
GraphQL subgraph
## Contributing
We welcome all the contributors! Please contact denghz.11@gmail.com for more details.
You can also create issues for us to report bugs or show your opinions.
## Open source
This project use MIT license

