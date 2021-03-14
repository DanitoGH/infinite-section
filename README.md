<p align="center">
  <a href="http://www.audallabs.com">
    <img alt="Audal Labs Logo" src="https://static.audallabs.com/logodark.png" width="90" />
  </a>
</p>

<h1 align="center">infinite-section</h1>

<h4 align="center">Virtualized window-based infinite-scrolling for sites and apps that load content in 'sections', that don't have a pre-determined width or height. Outperforms react-virtualized, and incredibly light-weight. Based on Facebook's infinite scrolling mechanism.</h4>

<pre align="center">npm i infinite-section</pre>

#### Why build this?
Virtualized scroll libraries are often built to handle tabular data - and can do an almost infinite number of table rows and columns fast - but fall apart when your data is less 'structured', or requires full-window scrolling. This library handles those use cases - where you're building social feeds, or product lists, or a news site, or anywhere you've got data that loads in without you being able to know its visual width and height in advance. It's based on an interpretation of how sites like Facebook, Twitter, and Forbes deal with infinite scrolling on section-based data. This method is great for accessibility and is super-easy to implement.

#### What can I do with this?
- Show large lists of visually different data, with fairly low memory usage and high accessibility
- Implement infinite scrolling easily with a React Hooks-based API and a single wrapping component for each of your nodes.

#### API
| Function Name               | Description                                                                                                                                                                                                                                                                    | Expects                                                                                                                                                                                                                                             | Returns                                                                                                     |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| useInfiniteSections (Hook)  | Provide this hook with the amount of nodes currently available (i.e. nodes.length if working on an array) and a callback function to load more nodes. It'll work out the current view behind the scenes and choose what to render accordingly.                                 | <b>nodesAvailable</b>: The amount of nodes currently available. <br/><br/><b>loadMoreCallback (optional)</b>: give the hook a function to call when more nodes need to be fetched (i.e. from your server).                                                                 | { currentView, setCurrentView, windowSize }: provide this object to the InfiniteSection component as props.
| InfiniteSection (Component) | The component that'll wrap all your section-based data. You'll probably use this like <code>{nodes.map((node, viewIndex) => \<InfiniteSection currentView={currentView} setCurrentView={setCurrentView} viewIndex={viewIndex} windowSize={windowSize}>{node.data}\</InfiniteSection>)}</code>. | <b>children</b>: Your React children to render. <br/><br/><b>currentView, setCurrentView, windowSize</b>: variables from useInfiniteSections hook.  viewIndex: the index of the view within the array of your nodes. Probably the same as whatever you're passing for key. | React element containing your Node's children. |
