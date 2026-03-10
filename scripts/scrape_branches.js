import fs from 'fs';

async function scrapeBranches() {
  const branches = [];
  console.log('Starting branch scrape...');
  
  // The user mentioned there are 59 branches. 
  // We'll try IDs from 1 to 100 to be safe, as IDs might not be sequential.
  for (let id = 1; id <= 100; id++) {
    try {
      const response = await fetch(`https://www.pakistancurrency.com/getbranch?id=${id}`);
      if (!response.ok) continue;
      
      const data = await response.json();
      if (data.status && data.message) {
        const branchData = JSON.parse(data.message);
        if (branchData && branchData.name) {
          console.log(`Found branch: ${branchData.name} (ID: ${id})`);
          branches.push({
            branch_name: branchData.name,
            address: branchData.address,
            phone: branchData.phone || branchData.mobile,
            city: branchData.name.split(' ')[0], // Best guess for city from name
            id: branchData.id
          });
        }
      }
    } catch (error) {
      // Silence errors for missing IDs
    }
    
    // Small delay to be polite
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  fs.writeFileSync('branches_data.json', JSON.stringify(branches, null, 2));
  console.log(`Successfully scraped ${branches.length} branches.`);
}

scrapeBranches();
