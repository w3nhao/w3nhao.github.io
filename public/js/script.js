(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);

// TL;DR Toggle Function for Publications
function toggleTldr(toggleElement) {
  // Find the parent meta line, then get its next sibling (the tldr content)
  var metaLine = toggleElement.parentElement;
  var tldrContent = metaLine.nextElementSibling;
  toggleElement.classList.toggle('active');
  tldrContent.classList.toggle('show');
}