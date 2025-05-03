<script>
  import { db } from '$lib/db';
  import { liveQuery } from '$lib/db/dexie';

  import Table from '$lib/ui/table.svelte';

  import CreateEntryForm from './create-entry-form.svelte';

  const entries = liveQuery(async () => await db.entry.toArray());
</script>

<CreateEntryForm />

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
      {#each entries.current as { id, name, amount, createdAt } (id)}
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{amount}</td>
          <td>{createdAt.toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </Table>
</div>
