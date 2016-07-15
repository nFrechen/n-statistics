// DObscure
// Copyright Zenica Computing Consultants (c)2004 All Rights Reserved
// Copyright Malcolm Boczek (c)2004
//
//
// Version
// 1.1		9-Mar-04	Original Release .NET 1_1_4322
// 2.0      1-Jan-06    Removed browser detection

function MailObscure(o)
{
	zObscureElement(o);
}

function DocumentReveal()
{
	var i,j;
	var coll = document.body.all; // childNodes ???
	
	if (coll == null) return;

    j = coll.length;
    
	for (i=0; i<j; i++)
	{
		var itm = coll.item(i);
		
		if (itm != null) zObscureNode(itm);
	}
}
function NoSpam(strID)
{
	if (!document.getElementById) return;
	
	var o = document.getElementById(strID);
	
	zObscureElement(o);	
}
function zObscureElement(o)
{
	if ((o == null) || (o.nospam != null)) return;
	
	var re = RegExp("(&#064;|%40|@).*?(&#045;|%2d|-){2}","i");
	var ree = RegExp("(&#046;|%2e|\\.){2}.*","i");
	var str = o.innerHTML;
	if ((o.href != null) && (o.href.length > 0))
	{
		o.href = o.href.replace(re, "@");
		o.href = o.href.replace(ree, "");
	}
	if (str != null)
	{
		str = str.replace(re, "@");
		o.innerHTML = str.replace(ree, "");
	}
	o.nospam = true;
}
function zObscureNode(o)
{
	if (o == null) return;
	
	if ((o.nodeName == "a") || (o.nodeName == "A"))
	{
		zObscureElement(o);
		return;
	}
	
	var i;
	var coll = o.childNodes;
	if (coll == null) return;
	
	for (i=0; i<coll.length; i++)
	{
		zObscureNode(coll.item(i));
	}
}

DocumentReveal();

