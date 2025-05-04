<script>
  import { ready } from '$lib/db';
  import { liveQuery } from '$lib/db/dexie';

  import Table from '$lib/ui/table.svelte';

  import CreateEntry from '$lib/feature/create-entry/index.svelte';
  import EditEntry from '$lib/feature/edit-entry/index.svelte';

  const entries = liveQuery(async () => {
    const db = await ready;
    return await db.entry.toArray();
  });
</script>

{#snippet cell()}
  <td>
    <div class="skeleton">
      <span class="invisible">&nbsp;</span>
    </div>
  </td>
{/snippet}

{#snippet row()}
  <tr>
    {@render cell()}
    {@render cell()}
    {@render cell()}
    {@render cell()}
    {@render cell()}
  </tr>
{/snippet}

<main class="space-y-4 p-4">
  {#await ready}
    <CreateEntry disabled />
  {:then}
    <CreateEntry />
  {/await}
  <div class="overflow-x-auto">
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Creation Time</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {#await ready}
          {@render row()}
          {@render row()}
          {@render row()}
          {@render row()}
        {:then}
          {#each entries.current as { id, name, amount, createdAt } (id)}
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{amount}</td>
              <td>{createdAt.toLocaleString()}</td>
              <td><EditEntry {id} /></td>
            </tr>
          {/each}
        {/await}
      </tbody>
    </Table>
  </div>
</main>
