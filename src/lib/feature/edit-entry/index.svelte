<script lang="ts">
  import { decode } from 'decode-formdata';
  import { parse } from 'valibot';

  import { ready } from '$lib/db';

  import Button from '$lib/ui/button.svelte';
  import Card from '$lib/ui/card/index.svelte';
  import CardActions from '$lib/ui/card/actions.svelte';
  import CardBody from '$lib/ui/card/body.svelte';
  import CardTitle from '$lib/ui/card/title.svelte';
  import Dialog from '$lib/ui/dialog.svelte';
  import Input from '$lib/ui/input.svelte';

  import { EditEntry } from './schema';

  let open = $state(false);

  async function edit({ id, name, amount }: EditEntry) {
    const db = await ready;
    await db.entry.update(id, { name, amount });
    open = false;
  }

  interface Props {
    id: number;
    disabled?: boolean;
  }

  const { id, disabled }: Props = $props();
</script>

<Dialog bind:open>
  {#snippet trigger(props)}
    <Button type="button" color="secondary" size="sm" {disabled} {...props}>Edit</Button>
  {/snippet}
  {#snippet content()}
    <Card color="neutral">
      <CardTitle><h2>Edit Entity</h2></CardTitle>
      <form
        onsubmit={event => {
          event.preventDefault();
          event.stopPropagation();
          if (event.currentTarget.reportValidity()) {
            const data = new FormData(event.currentTarget);
            const payload = decode(data, { numbers: ['id', 'amount'] });
            edit(parse(EditEntry, payload));
          }
        }}
      >
        <CardBody>
          <input type="hidden" name="id" value={id} />
          <Input type="text" placeholder="Name" name="name" />
          <Input type="number" step="0.01" placeholder="Amount" name="amount" />
        </CardBody>
        <CardActions class="ml-auto">
          <Button type="submit" color="success" class="w-fit">Submit</Button>
        </CardActions>
      </form>
    </Card>
  {/snippet}
</Dialog>
