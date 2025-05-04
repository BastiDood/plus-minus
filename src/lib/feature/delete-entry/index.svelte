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

  import { DeleteEntry } from './schema';

  let open = $state(false);
  function close() {
    open = false;
  }

  async function remove({ id }: DeleteEntry) {
    const db = await ready;
    await db.entry.delete(id);
    close();
  }

  interface Props {
    id: number;
    disabled?: boolean;
  }

  const { id, disabled }: Props = $props();
</script>

<Dialog bind:open>
  {#snippet trigger(props)}
    <Button type="button" color="error" size="sm" {disabled} {...props}>Delete</Button>
  {/snippet}
  {#snippet content()}
    <Card color="neutral">
      <CardTitle><h2>Delete Entity</h2></CardTitle>
      <CardBody>
        <p>Are you sure you want to delete this entity?</p>
      </CardBody>
      <CardActions>
        <form
          onreset={close}
          onsubmit={event => {
            event.preventDefault();
            event.stopPropagation();
            if (event.currentTarget.reportValidity()) {
              const data = new FormData(event.currentTarget);
              const payload = decode(data, { numbers: ['id'] });
              remove(parse(DeleteEntry, payload));
            }
          }}
          class="flex justify-end gap-2"
        >
          <input type="hidden" name="id" value={id} />
          <Button type="reset" color="info">No</Button>
          <Button type="submit" color="error">Yes</Button>
        </form>
      </CardActions>
    </Card>
  {/snippet}
</Dialog>
