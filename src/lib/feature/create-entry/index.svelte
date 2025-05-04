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

  import { CreateEntry } from './schema';

  let open = $state(false);

  async function add({ name, amount }: CreateEntry) {
    const db = await ready;
    await db.entry.add({ name, amount, createdAt: new Date() });
    open = false;
  }

  interface Props {
    disabled?: boolean;
  }

  const { disabled }: Props = $props();
</script>

<Dialog bind:open>
  {#snippet trigger(props)}
    <Button type="button" color="primary" {disabled} {...props}>Create</Button>
  {/snippet}
  {#snippet content()}
    <Card color="neutral">
      <CardTitle><h2>Create Entity</h2></CardTitle>
      <form
        onsubmit={event => {
          event.preventDefault();
          event.stopPropagation();
          if (event.currentTarget.reportValidity()) {
            const data = new FormData(event.currentTarget);
            const payload = decode(data, { numbers: ['amount'] });
            add(parse(CreateEntry, payload));
          }
        }}
      >
        <CardBody>
          <Input type="text" required placeholder="Name" name="name" />
          <Input type="number" required step="0.01" placeholder="Amount" name="amount" />
        </CardBody>
        <CardActions class="ml-auto">
          <Button type="submit" color="success" class="w-fit">Submit</Button>
        </CardActions>
      </form>
    </Card>
  {/snippet}
</Dialog>
