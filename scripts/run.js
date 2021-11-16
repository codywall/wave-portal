const main = async () => {
  const ticketContractFactory = await hre.ethers.getContractFactory(
    "TicketPortal"
  );
  const ticketContract = await ticketContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await ticketContract.deployed();
  console.log("Contract addy:", ticketContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    ticketContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let ticketTxn = await ticketContract.ticket("This is ticket #1");
  await ticketTxn.wait();

  let ticketTxn = await ticketContract.ticket("This is ticket #2");
  await ticketTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    ticketContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allTickets = await ticketContract.getAllTickets();
  console.log(allTickets);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
