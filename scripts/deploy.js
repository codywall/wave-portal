const main = async () => {
  const ticketContractFactory = await hre.ethers.getContractFactory(
    "TicketPortal"
  );
  const ticketContract = await ticketContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  await ticketContract.deployed();

  console.log("TicketPortal address: ", ticketContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
