<script>
  import { ready } from '$lib/db';
  import { liveQuery } from '$lib/db/dexie';

  import Table from '$lib/ui/table.svelte';

  import CreateEntryForm from './create-entry-form.svelte';

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
  </tr>
{/snippet}

<main class="space-y-4 p-4">
  {#await ready}
    <CreateEntryForm disabled />
  {:then}
    <CreateEntryForm />
  {/await}
  <div class="overflow-x-auto">
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Creation Time</th>
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
            </tr>
          {/each}
        {/await}
      </tbody>
    </Table>
  </div>
</main>
