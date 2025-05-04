<script>
  import { ready } from '$lib/db';
  import { liveQuery } from '$lib/db/dexie';

  import Keyboard from '$lib/ui/keyboard.svelte';
  import Table from '$lib/ui/table.svelte';

  import CreateEntry from '$lib/feature/create-entry/index.svelte';
  import DeleteEntry from '$lib/feature/delete-entry/index.svelte';
  import EditEntry from '$lib/feature/edit-entry/index.svelte';

  const entries = liveQuery(async () => {
    const db = await ready;
    return await db.entry.toArray();
  });

  const net = $derived.by(() => {
    const rows = entries.current ?? [];
    return rows.reduce((total, { amount }) => total + amount, 0);
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
    {@render cell()}
  </tr>
{/snippet}

<main class="space-y-4 p-4">
  <div class="space-x-2">
    {#await ready}
      <CreateEntry disabled />
    {:then}
      <CreateEntry />
    {/await}
    <Keyboard size="xl">{net}</Keyboard>
  </div>
  <div class="overflow-x-auto">
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Creation Time</th>
          <th>Edit</th>
          <th>Delete</th>
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
              <td><DeleteEntry {id} /></td>
            </tr>
          {/each}
        {/await}
      </tbody>
    </Table>
  </div>
</main>
